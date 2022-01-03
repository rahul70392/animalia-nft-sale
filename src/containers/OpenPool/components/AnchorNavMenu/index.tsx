import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { throttle } from 'lodash'

import * as style from './AnchorNavMenu.module.scss'
import { NAV_ANCHORS } from '~containers/OpenPool/components/AnchorNavMenu/constants'
import AnchorNavMenuItem from '~containers/OpenPool/components/AnchorNavMenuItem'

type AnchorNavMenuProps = {
  className?: string
  [otherProps: string]: any
}

const AnchorNavMenu = (props: AnchorNavMenuProps) => {
  const { className, ...rest } = props

  const [activeSection, setActiveSection] = useState(NAV_ANCHORS[0].id)

  useEffect(() => {
    const sections = document.getElementsByClassName('landing-section')

    const handleScroll = throttle(() => {
      let tempActiveSection = ''

      for (let i = 0; i < sections.length; i += 1) {
        const el = sections[i]

        // @ts-ignore
        if (el && window.pageYOffset - el.offsetTop + 70 + 100 > 0) {
          tempActiveSection = el.id
        } else {
          break
        }
      }

      setActiveSection(tempActiveSection)
    }, 200)

    window.addEventListener('scroll', handleScroll, false)
    return () => {
      window.removeEventListener('scroll', handleScroll, false)
    }
  }, [])

  return (
    <nav {...rest} className={classNames(style.anchorNavMenu, className)}>
      <div className={style.itemsWrapper}>
        {NAV_ANCHORS.map(({ title, id }) => (
          <AnchorNavMenuItem
            key={id}
            sectionId={id}
            activeSectionId={activeSection}
          >
            {title}
          </AnchorNavMenuItem>
        ))}
      </div>
    </nav>
  )
}

export default AnchorNavMenu
