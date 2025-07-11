import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { claimUnitag } from 'uniswap/src/data/apiClients/unitagsApi/UnitagsApiClient'
import { useResetUnitagsQueries } from 'uniswap/src/data/apiClients/unitagsApi/useResetUnitagsQueries'
import { SignMessageFunc } from 'uniswap/src/data/utils'
import { pushNotification } from 'uniswap/src/features/notifications/slice'
import { AppNotificationType } from 'uniswap/src/features/notifications/types'
import { UnitagEventName } from 'uniswap/src/features/telemetry/constants'
import { sendAnalyticsEvent } from 'uniswap/src/features/telemetry/send'
import { isLocalFileUri, uploadAndUpdateAvatarAfterClaim } from 'uniswap/src/features/unitags/avatars.native'
import { UnitagClaim, UnitagClaimContext } from 'uniswap/src/features/unitags/types'
import { parseUnitagErrorCode } from 'uniswap/src/features/unitags/utils'
import { getUniqueId } from 'utilities/src/device/uniqueId'
import { logger } from 'utilities/src/logger/logger'

type ClaimUnitagInput = {
  claim: UnitagClaim
  context: UnitagClaimContext
  signMessage?: SignMessageFunc
}

/**
 * A custom async hook that handles the process of claiming a Unitag
 * Hook must be used inside the OnboardingContext
 */
export const useClaimUnitag = (): ((input: ClaimUnitagInput) => Promise<{ claimError?: string }>) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const resetUnitagsQueries = useResetUnitagsQueries()

  return async ({ claim, context, signMessage }: ClaimUnitagInput) => {
    const deviceId = await getUniqueId()

    if (!claim.address || !deviceId || !signMessage) {
      logger.error('Missing required parameters', {
        tags: { file: 'useClaimUnitag', function: 'claimUnitag' },
      })
      return { claimError: t('unitags.claim.error.default') }
    }

    try {
      const claimResponse = await claimUnitag({
        data: {
          username: claim.username,
          deviceId,
          metadata: {
            avatar: claim.avatarUri && isLocalFileUri(claim.avatarUri) ? undefined : claim.avatarUri,
          },
        },
        address: claim.address,
        signMessage,
      })

      if (claimResponse.errorCode) {
        return { claimError: parseUnitagErrorCode(t, claimResponse.errorCode) }
      }

      resetUnitagsQueries()

      if (claimResponse.success) {
        // Log claim success
        sendAnalyticsEvent(UnitagEventName.UnitagClaimed, context)
        if (claim.avatarUri && isLocalFileUri(claim.avatarUri)) {
          const { success: uploadUpdateAvatarSuccess } = await uploadAndUpdateAvatarAfterClaim({
            username: claim.username,
            imageUri: claim.avatarUri,
            address: claim.address,
            signMessage,
          })

          if (!uploadUpdateAvatarSuccess) {
            // Don't block claim flow if avatar upload fails, just dispatch a notification for the error
            dispatch(
              pushNotification({
                type: AppNotificationType.Error,
                errorMessage: t('unitags.claim.error.avatar'),
              }),
            )
          }
        }

        resetUnitagsQueries()
      }

      // Return success (no error)
      return { claimError: undefined }
    } catch (e) {
      logger.error(e, { tags: { file: 'useClaimUnitag', function: 'claimUnitag' } })
      return { claimError: t('unitags.claim.error.default') }
    }
  }
}
