import { SequenceWaaS } from '@0xsequence/waas';

// Create a singleton instance of SequenceWaaS
export const sequenceWaas = new SequenceWaaS({
  network: 'polygon',
  projectAccessKey: process.env.NEXT_PUBLIC_PROJECT_ACCESS_KEY!,
  waasConfigKey: process.env.NEXT_PUBLIC_WAAS_CONFIG_KEY!,
});

// Helper function to check if user is signed in
export const checkAuthStatus = async () => {
  const isSignedIn = await sequenceWaas.isSignedIn();
  if (isSignedIn) {
    const address = await sequenceWaas.getAddress();
    return { isSignedIn, address };
  }
  return { isSignedIn, address: null };
};

// Helper function to handle sign out
export const handleSignOut = async () => {
  try {
    await sequenceWaas.dropSession();
    return true;
  } catch (error) {
    console.error('Sign out failed:', error);
    return false;
  }
};
