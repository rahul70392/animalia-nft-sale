import React from 'react'
import classNames from 'classnames'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { graphql, useStaticQuery, Link } from 'gatsby'

import * as style from './SectionLanding.module.scss'
import { FOLLOW_TYPES } from './constants'
// import SolphinItem from '../SolphinItem'
import AnchorNavMenu from '../AnchorNavMenu'

type SectionLandingProps = {
  className?: string
  [otherProps: string]: any
}

const SectionLanding = (props: SectionLandingProps) => {
  const { className, ...rest } = props
  const data = useStaticQuery(graphql`
    fragment ItemImgs on FileConnection {
      nodes {
        name
        childImageSharp {
          gatsbyImageData(width: 88, sizes: "64px")
        }
      }
    }
    fragment HeroImg on File {
      childImageSharp {
        gatsbyImageData(
          width: 1360
          sizes: "(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) calc(100vw - 40px), (max-width: 1440px) calc(100vw - 80px), 960px"
        )
      }
    }
    fragment PaddedImg on File {
      childImageSharp {
        gatsbyImageData(
          width: 1296
          sizes: "(max-width: 640px) calc(100vw - 16px - 24px), (max-width: 1024px) calc(100vw - 40px - 40px), (max-width: 1440px) calc(100vw - 80px - 64px), 906px"
        )
      }
    }
    query {
      dolphins: allFile(
        filter: { relativeDirectory: { regex: "/dolphins/" } }
        sort: { order: ASC, fields: name }
      ) {
        ...ItemImgs
      }
      follow: allFile(
        filter: { relativeDirectory: { regex: "/follow/" } }
        sort: { order: ASC, fields: name }
      ) {
        ...ItemImgs
      }
      backgrounds: allFile(
        filter: { relativeDirectory: { regex: "/backgrounds/" } }
        sort: { order: ASC, fields: name }
      ) {
        ...ItemImgs
      }
      hats: allFile(
        filter: { relativeDirectory: { regex: "/hats/" } }
        sort: { order: ASC, fields: name }
      ) {
        ...ItemImgs
      }
      eyes: allFile(
        filter: { relativeDirectory: { regex: "/eyes/" } }
        sort: { order: ASC, fields: name }
      ) {
        ...ItemImgs
      }
      clothes: allFile(
        filter: { relativeDirectory: { regex: "/clothes/" } }
        sort: { order: ASC, fields: name }
      ) {
        ...ItemImgs
      }
      rare: allFile(
        filter: { relativeDirectory: { regex: "/rare/" } }
        sort: { order: ASC, fields: name }
      ) {
        ...ItemImgs
      }
      imgSolphins: file(
        relativeDirectory: { eq: "solphins/other" }
        name: { eq: "Animalia_banner" }
      ) {
        ...HeroImg
      }
      imgToro: file(
        relativeDirectory: { eq: "solphins/other" }
        name: { eq: "Bull_marketing" }
      ) {
        ...HeroImg
      }
      imgURSA: file(
        relativeDirectory: { eq: "solphins/other" }
        name: { eq: "bear_marketing" }
      ) {
        ...HeroImg
      }
      imgRoadmap: file(
        relativeDirectory: { eq: "solphins/other" }
        name: { eq: "roadmap" }
      ) {
        ...PaddedImg
      }
      imgChest: file(
        relativeDirectory: { eq: "solphins/other" }
        name: { eq: "chest" }
      ) {
        ...PaddedImg
      }
    }
  `)

  return (
    <div {...rest} className={classNames(style.sectionLanding, className)}>
      <AnchorNavMenu className={style.nav} />
      <div className={style.blockMain}>
        <section id="section-features" className="landing-section">
          <h1>Features</h1>
          <GatsbyImage
            alt="Solphins"
            image={getImage(data.imgSolphins)!}
            className={style.imgSolphins}
          />
          <p>
            Animalia is an independent free-to-play online NFT trading card game
            featuring crypto-inspired meme creatures and gemstones. Powered by
            the Binance Smart Chain, Animalia gives you complete ownership over
            your in-game collectibles. Collect rare cards, create your own NFTs,
            build your deck, battle with other players and sell cards to other
            traders.
          </p>
        </section>
        <section id="section-types" className="landing-section">
          <h1>Types</h1>
          <div className={style.typeMain}>
            <div className={style.typeItem}>
              <GatsbyImage
                alt="Solphins"
                image={getImage(data.imgToro)!}
                className={style.imgTypes}
              />
              <p>TORO</p>
              <p>[My enchanted will destroy you!]</p>
              <p>
                No other Titans uses the obscure with as much expertise and
                crude power as a Toro. Utilizing their unmatched cluster of
                spells, Toro can wipe entire boards of critters, deal
                destructive amounts of damage directly to their enemies, or
                gather unadulterated energy. Expertise in enchanted powers used
                by Toro have astonishing outcomes. They take advantage of nature
                magic by activating powerful effects.
              </p>
            </div>
            <div className={style.typeItem}>
              <GatsbyImage
                alt="Solphins"
                image={getImage(data.imgURSA)!}
                className={style.imgTypes}
              />
              <p>URSA</p>
              <p>[Triumph or death!]</p>
              <p>
                Prepared contenders of unrivaled ability, Ursa have dominance
                over a stockpile of weaponry and protection, permitting them to
                be both dangerous soldiers and impressive safeguards. Taking
                harm just serves to incense Ursa and his Minions, setting off
                amazing impacts that further improve their fearsome capacities.
                Ursa features its ability to wield varieties of martial tools
                with deadly alacrity.
              </p>
            </div>
          </div>
        </section>
        <section id="section-follow" className="landing-section">
          <h1>Follow Us</h1>
          <ul>
            {FOLLOW_TYPES.map((followType) => (
              <li>
                <GatsbyImage
                  key={followType.name}
                  alt={followType.name}
                  image={
                    getImage(
                      data.follow.nodes.find(
                        (img: any) => img.name === followType.img
                      )
                    )!
                  }
                  sizes="(max-width: 640px) 18px, (max-width: 1024px) 18px, 20px"
                  className={style.imgFollow}
                />
                <Link to={followType.name} target="_blank">
                  {followType.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        {/* <section id="section-rarity" className="landing-section">
          <h1>Attributes & Rarity</h1>
          <p>Backgrounds: Lavender, Sea, Yellow, Green, Pink, Solana.</p>
          <p>
            Clothes: Frutci, Berry, Rari, Lou Loui, Dollar Necklace, Smoking,
            Super, P Hub, Tommy, Camouflage Blue, Camouflage Green, Camouflage
            Red, Bodywarmer Orange, Bodywarmer Blue, Black sweater, Police vest,
            Wife beater.
          </p>
          <p>
            Hat: Blond hair, Punk, Pirate, Ninja, Crown, Mexican, Afro, Farmer
            Hat, Black hat, Straw hat, Cap, Beanie, Cap backward, Propellor Hat,
            Mc Cap, Beret Green, Beret Red.
          </p>
          <p>
            Eyewear: Laser, Viper, Summer pink, Googles, Summer yellow, Summer
            thug life, Zorro, Summer black.
          </p>
          <p>Mouthpiece: Cigarette, Pipe, Joint.</p>
          <div className={style.cardImg} style={{ marginTop: '24px' }}>
            {ITEM_DECK.map(
              ({
                sectionName,
                sectionContent,
                graphqlName,
                textGradient = '',
              }) => (
                <div key={sectionName}>
                  <h5
                    className={classNames(style.itemSectionHeading, {
                      [style[textGradient]]: textGradient,
                    })}
                  >
                    <span> {sectionName}</span>
                  </h5>
                  <div className={style.flexItems}>
                    {sectionContent.map((item) => (
                      <SolphinItem
                        key={item.img}
                        name={item.name}
                        rarity={item.rarity}
                        gatsbyImgData={getImage(
                          data[graphqlName].nodes.find(
                            (img: any) => img.name === item.img
                          )
                        )}
                      />
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </section>
        <section id="section-distribution" className="landing-section">
          <h1>Distribution</h1>
          <p>
            In combination with Solanium&apos;s lottery system, we are aiming to
            become one of the most fairly launched NFT projects ever. You can
            already browse all available Flippies on our website, you don&apos;t
            know which one you will get before the distribution has been
            completed.
          </p>
          <p>
            At the end of the whitelisting sign-up period and sale, Solanium
            will generate a list of all winning addresses. We will use the the
            blockhash of future slot 97,105,000 on the Solana blockchain to
            randomly sort this list. The blockhash will be used as seed for the
            randomization. Next all Flippies will get distributed 1 to 10,000
            depending on the order of that randomly sorted list.
          </p>
          <p>
            All randomization and a replication package will be published later
            on our Github so anyone can verify the distribution was executed
            fairly.
          </p>
        </section>
        <section id="section-roadmap" className="landing-section">
          <h1>Roadmap</h1>
          <div className={style.cardImg}>
            <GatsbyImage alt="Roadmap" image={getImage(data.imgRoadmap)!} />
          </div>
          <ul>
            <li>
              Distribution: Flippies get distributed to sale participants.
            </li>
            <li>
              Exclusive Flippies merch: Exclusive Flippies merch with limited
              stock.
            </li>
            <li>
              Marketplace: Marketplace will be released for Flippies trading.
            </li>
            <li>
              Community ranking ladder: Community ranking ladder will be
              released for Flippies holders.
            </li>
            <li>
              Flippies social media contests: Competition between flippies
              holders on social media.
            </li>
            <li>
              Collector highlight: Flippies will be advertised worldwide,
              billboards, commercials, Breakpoint promotion and more!
            </li>
            <li>
              Solana blockchain event: Find Flippies and make a picture of them
              during the Solana conference in Lisbon and have a chance to win
              special prizes!
            </li>
          </ul>
        </section>
        <section id="section-token" className="landing-section">
          <h1>Token</h1>
          <div className={style.cardImg}>
            <GatsbyImage alt="Chest" image={getImage(data.imgChest)!} />
          </div>
          <p>
            We&apos;re a bunch of NFT designers and developers that are in love
            with the Solana blockchain (and penguins!). We aim to bring unique
            and fun art to the Solana community in combination with a fair
            launch.
          </p>
        </section> */}
      </div>
    </div>
  )
}

export default SectionLanding
