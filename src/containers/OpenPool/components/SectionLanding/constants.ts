import { Gradients } from '~utils/enums'

export const DOLPHIN_TYPES = [
  { name: 'Green', rarity: 29.37, img: 'dolphin-03' },
  { name: 'Yellow', rarity: 2.54, img: 'dolphin-02' },
  { name: 'Original', rarity: 28.45, img: 'dolphin-01' },
  { name: 'Alien', rarity: 4.34, img: 'dolphin-06' },
  { name: 'Zombie', rarity: 6.84, img: 'dolphin-05' },
  { name: 'Pink', rarity: 28.46, img: 'dolphin-04' },
]

export const FOLLOW_TYPES = [
  { name: 'https://animalia.games/', rarity: 10, img: 'frame' },
  { name: 'https://twitter.com/Animalia_token', rarity: 2.54, img: 'twitter' },
  { name: 'https://t.me/Animalia_ANIM', rarity: 28.45, img: 'telegram1' },
  {
    name: 'https://medium.com/animaliaanim',
    rarity: 4.34,
    img: 'iconmonstr-medium',
  },
  {
    name: 'https://www.reddit.com/r/Animalia_ANIM',
    rarity: 6.84,
    img: 'reddit',
  },
  {
    name: 'https://github.com/AnimaliaANIM?tab=repositories',
    rarity: 28.46,
    img: 'github',
  },
  {
    name: 'https://t.me/Animalia_ANIM_Channel',
    rarity: 28.46,
    img: 'telegram2',
  },
  {
    name: 'https://www.youtube.com/c/AnimaliaANIM',
    rarity: 28.46,
    img: 'youtube',
  },
  { name: 'https://instagram.com/animalia_token', rarity: 28.46, img: 'insta' },
]

const BACKGROUND_TYPES = [
  { name: 'Solana', rarity: 10.13, img: 'Solana' },
  { name: 'Green', rarity: 15.85, img: 'Green' },
  { name: 'Pink', rarity: 15.98, img: 'Pink' },
  { name: 'Sea', rarity: 19.31, img: 'Sea' },
  { name: 'Yellow', rarity: 19.22, img: 'Yellow' },
  { name: 'Lavender', rarity: 19.51, img: 'Lavender' },
]

const HAT_TYPES = [
  { name: 'Name', rarity: 10, img: 'head-01' },
  { name: 'Name', rarity: 10, img: 'head-02' },
  { name: 'Name', rarity: 10, img: 'head-03' },
  { name: 'Name', rarity: 10, img: 'head-04' },
  { name: 'Name', rarity: 10, img: 'head-05' },
  { name: 'Name', rarity: 10, img: 'head-06' },
  { name: 'Name', rarity: 10, img: 'head-07' },
  { name: 'Name', rarity: 10, img: 'head-08' },
  { name: 'Name', rarity: 10, img: 'head-09' },
  { name: 'Name', rarity: 10, img: 'head-10' },
  { name: 'Name', rarity: 10, img: 'head-11' },
  { name: 'Name', rarity: 10, img: 'head-12' },
  { name: 'Name', rarity: 10, img: 'head-13' },
  { name: 'Name', rarity: 10, img: 'head-14' },
  { name: 'Name', rarity: 10, img: 'head-15' },
  { name: 'Name', rarity: 10, img: 'head-16' },
  { name: 'Name', rarity: 10, img: 'head-17' },
  { name: 'Name', rarity: 10, img: 'head-18' },
  { name: 'Name', rarity: 10, img: 'head-19' },
]

const EYE_TYPES = [
  { name: 'Name', rarity: 10, img: 'eyes-01_r' },
  { name: 'Name', rarity: 10, img: 'eyes-02_r' },
  { name: 'Name', rarity: 10, img: 'eyes-03_r' },
  { name: 'Name', rarity: 10, img: 'eyes-04_r' },
  { name: 'Name', rarity: 10, img: 'eyes-05_r' },
  { name: 'Name', rarity: 10, img: 'eyes-06_r' },
  { name: 'Name', rarity: 10, img: 'eyes-07_r' },
  { name: 'Name', rarity: 10, img: 'eyes-08_r' },
]

const CLOTHES_TYPES = [
  { name: 'Name', rarity: 10, img: 'body-01' },
  { name: 'Name', rarity: 10, img: 'body-02' },
  { name: 'Name', rarity: 10, img: 'body-03' },
  { name: 'Name', rarity: 10, img: 'body-04' },
  { name: 'Name', rarity: 10, img: 'body-05' },
  { name: 'Name', rarity: 10, img: 'body-06' },
  { name: 'Name', rarity: 10, img: 'body-07' },
  { name: 'Name', rarity: 10, img: 'body-08' },
  { name: 'Name', rarity: 10, img: 'body-09' },
  { name: 'Name', rarity: 10, img: 'body-10' },
  { name: 'Name', rarity: 10, img: 'body-11' },
  { name: 'Name', rarity: 10, img: 'body-12' },
  { name: 'Name', rarity: 10, img: 'body-gilette' },
]

const RARE_TYPES = [
  { name: 'Name', rarity: 10, img: 'nyan' },
  { name: 'Name', rarity: 10, img: 'very-rare-01' },
  { name: 'Name', rarity: 10, img: 'very-rare-02' },
  { name: 'Name', rarity: 10, img: 'very-rare-04' },
  { name: 'Name', rarity: 10, img: 'very-rare-05' },
  { name: 'Name', rarity: 10, img: 'very-rare-06' },
  { name: 'Name', rarity: 10, img: 'very-rare-07' },
  { name: 'Name', rarity: 10, img: 'very-rare-08' },
]

export const ITEM_DECK = [
  {
    sectionName: 'Types',
    sectionContent: DOLPHIN_TYPES,
    graphqlName: 'dolphins',
  },
  {
    sectionName: 'Backgrounds',
    sectionContent: BACKGROUND_TYPES,
    graphqlName: 'backgrounds',
  },
  {
    sectionName: 'Hats',
    sectionContent: HAT_TYPES,
    graphqlName: 'hats',
  },
  {
    sectionName: 'Eyes',
    sectionContent: EYE_TYPES,
    graphqlName: 'eyes',
  },
  {
    sectionName: 'Clothes',
    sectionContent: CLOTHES_TYPES,
    graphqlName: 'clothes',
  },
  {
    sectionName: 'Rare',
    sectionContent: RARE_TYPES,
    graphqlName: 'rare',
    textGradient: Gradients.YELLOW,
  },
]
