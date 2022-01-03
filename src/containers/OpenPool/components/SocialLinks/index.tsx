import React from 'react'
import classNames from 'classnames'

import * as style from './SocialLinks.module.scss'
import Icon from '~components/ui/Icon'
import { SOCIAL_LINKS } from './constants'

type SocialLinksProps = {
  className?: string
  [otherProps: string]: any
}

const SocialLinks = (props: SocialLinksProps) => {
  const { className, ...rest } = props

  return (
    <div {...rest} className={classNames(style.socialLinks, className)}>
      {SOCIAL_LINKS.map(({ title, href, iconName, size }) => (
        <a key={iconName} title={title} href={href}>
          <Icon name={iconName} size={(size as [number, number]) ?? 24} />
        </a>
      ))}
    </div>
  )
}

export default SocialLinks
