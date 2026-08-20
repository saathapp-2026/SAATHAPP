/**
 * API service for Reward Redemption
 */

const API_BASE_URL = process.env.VITE_API_URL || '/api/v1';

export const rewardRedemptionApi = {
  /**
   * Fetch user's rewards
   * @param {string} status - Optional filter by status (AVAILABLE, REDEEMED, EXPIRED)
   */
  getRewards: async (status) => {
    // Mock implementation
    console.log(`Fetching rewards${status ? ` with status: ${status}` : ''}...`);
    return Promise.resolve([
      {
        rewardId: 'rew-101',
        milestoneId: 'mile-7',
        rewardType: 'MONETARY',
        rewardValue: 25,
        status: 'AVAILABLE',
        issuedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]);
  },

  /**
   * Redeem a monetary or coupon reward
   */
  redeemReward: async (rewardId) => {
    console.log(`Redeeming reward: ${rewardId}`);
    return Promise.resolve({ success: true, newStatus: 'REDEEMED' });
  },

  /**
   * Claim a merchandise reward (creates fulfillment request)
   */
  claimMerchandise: async (rewardId, deliveryInfo) => {
    console.log(`Claiming merchandise: ${rewardId} to ${deliveryInfo.address}`);
    return Promise.resolve({ success: true, claimId: 'CLM-9823', status: 'CLAIMED' });
  },

  /**
   * Attach a free item reward to current cart
   */
  attachFreeItemToCart: async (rewardId, cartId) => {
    console.log(`Attaching reward ${rewardId} to cart ${cartId}`);
    return Promise.resolve({ success: true, updatedCart: {} });
  }
};
