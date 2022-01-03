import dayjs from 'dayjs'

export const LAUNCH_STEPS = [
  {
    step: 1,
    title: 'Connect wallet',
    description: 'Connect your wallet',
    isActive: false,
    isFinished: false,
  },
  {
    step: 2,
    title: 'Spend PIXEL',
    description: 'Purchase PIXEL to access the sale.',
    isActive: false,
    isFinished: false,
  },
  {
    step: 3,
    title: 'Purchase NFT',
    description: 'Participate in the NFT sale.',
    isActive: false,
    isFinished: false,
    timestamp: dayjs().add(2, 'd').unix(),
  },
  // {
  //   step: 4,
  //   title: 'Sale',
  //   description: 'Winners can participate in the token sale.',
  //   isActive: true,
  //   timestamp: dayjs().add(7, 'd').unix(),
  // },
  // {
  //   step: 5,
  //   title: 'Distribution',
  //   description: 'The tokens get distributed to Sale participants.',
  //   timestamp: dayjs().add(14, 'd').unix(),
  // },
]
