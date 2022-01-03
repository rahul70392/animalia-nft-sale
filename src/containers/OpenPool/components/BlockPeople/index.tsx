import React from 'react'
import classNames from 'classnames'

import * as style from './BlockPeople.module.scss'

type BlockPeopleProps = {
  className?: string
  [otherProps: string]: any
}

const BlockPeople = (props: BlockPeopleProps) => {
  const { className, ...rest } = props

  return (
    <div {...rest} className={classNames(style.blockPeople, className)}>
      <div className={style.gridText}>
        <h3>159,842</h3>
        <p className={style.textFollowers}>followers</p>
      </div>
      <div className={style.wrapperAvatars}>
        <div className={style.gridAvatars}>
          {Array.from({ length: 32 }, (v, i) => i).map((v) => (
            <img
              key={v}
              alt="person"
              src={`https://picsum.photos/96/96?nocache=${v}`}
              className={style.imgAvatar}
              width={48}
              height={48}
            />
          ))}
        </div>
        <div className={style.blendShadowLeft} />
        <div className={style.blendShadowRight} />
      </div>
    </div>
  )
}

export default BlockPeople
