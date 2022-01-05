import React, { FC, useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'

// @ts-ignore
import * as style from './OpenPool.module.scss'
import { Data } from '~interfaces'
import Route from '~routes'
import SEO from '~components/seo'
import Layout from '~components/general/Layout'
import SectionLanding from './components/SectionLanding'
import CardPoolInteraction from './components/CardPoolInteraction'
// import SocialLinks from './components/SocialLinks'
import {
  balanceOfUSDT,
  toEther,
} from '~utils/web3Instance'

type OpenPoolPageProps = {
  data: Data
  // id: number
  [otherProps: string]: any
}

const OpenPoolPage: FC<OpenPoolPageProps> = (props) => {
  const { data } = props
  const { site } = data
  const [isLoading, setIsLoading] = useState(false)
  const [processID, setProcessID] = useState(1)
  const [isSaleEnded, setIsSaleEnded] = useState(true)

  const handleChangeStep = (stepID: number) => setProcessID(stepID)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (processID > 3 && processID < 6) {
        setProcessID(processID + 1)
      }
    }, 5000)

    return () => {
      clearTimeout(timeout)
    }
  }, [processID])

  useEffect(() => {
    // if (process.env.GATSBY_PIXEL_RECEIVE_ADDRESS && process.env.GATSBY_USDT_RECEIVE_ADDRESS && process.env.GATSBY_TOTAL_SUPPLY) {
    //   balanceOfUSDT(process.env.GATSBY_USDT_RECEIVE_ADDRESS)
    //     .call()
    //     .then((erc: any) => {
    //       console.log('receiver balance', toEther(erc));
    //       if (process.env.GATSBY_TOTAL_SUPPLY && (parseInt(toEther(erc)) >= parseInt(process.env.GATSBY_TOTAL_SUPPLY))) {
    //         setIsSaleEnded(true)
    //       } else {
    //         setIsSaleEnded(false)
    //       }
    //     })
    //     .catch((e: any) => console.log(e, 'erc balance not fetched'))
    // }
    // console.log('supply', process.env.GATSBY_TOTAL_SUPPLY)
  }, [])

  return (
    <Layout siteTitle={site.siteMetadata.title} activePage={Route.HOMEPAGE}>
      <Container className={style.containerPool}>
        <SEO title="Open Pool" />
        <CardPoolInteraction
          isSaleEnded={isSaleEnded}
          isLoading={isLoading}
          tempPoolId={processID}
          updateStep={handleChangeStep}
          handleLoading={(value: boolean) => setIsLoading(value)}
        />
        {/* <SocialLinks /> */}
        <SectionLanding className={style.sectionLanding} />
      </Container>
    </Layout>
  )
}

export default OpenPoolPage
