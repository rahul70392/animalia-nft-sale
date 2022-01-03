import React from 'react'
import classNames from 'classnames'
import { GatsbyImage } from 'gatsby-plugin-image'

import * as style from './SolphinItem.module.scss'

type SolphinItemProps = {
  name: string
  rarity: number
  gatsbyImgData: any
  className?: string
  [otherProps: string]: any
}

const SolphinItem = (props: SolphinItemProps) => {
  const { className, name, rarity, gatsbyImgData, ...rest } = props

  return (
    <div {...rest} className={classNames(style.solphinItem, className)}>
      <GatsbyImage alt={name} image={gatsbyImgData} className={style.img} />
      <p className={style.textName}>{name}</p>
      <p className={style.textRarity}>
        {new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(rarity)}
        %
      </p>
    </div>
  )
}

export default SolphinItem
