import React from 'react'
import { Collapse, CollapseProps, Flex } from 'antd'
import Link from 'next/link'
import Styles from './mobileNavigationModel.module.scss'
import Image from 'next/image'


const getcollapsedItem = (items, className: { collapseClass: string, fontClass: string }, toggleMobileNavigationPanel: () => void, classNames: Array<{ collapseClass: string, fontClass: string }>, level: number) => {
  const getLabel = (item: any) => {
    if (item.href) {
      return (
        <Link href={item.href} onClick={toggleMobileNavigationPanel}>
          <span className={Styles[className.fontClass]}>{item.label}</span>
        </Link>
      )
    } else {
      return (
        <span className={Styles[className.fontClass]}>{item.label}</span>
      )
    }
  }

  const getChildren = (item: any) => {
    if (item.children && item.children.length > 0) {
      return (
        <div className={Styles.panelClassName}>
          <MobileNavigationModel
            toggleMobileNavigationPanel={toggleMobileNavigationPanel}
            navigationList={item.children}
            classNames={classNames}
            level={level}
          />
        </div>
      )
    } else if (!item.children || item.children.length <= 0) {
      return null;
    }
  }

  return (
    items.map((item, index) => {
      const childExist = item.children && Array.isArray(item.children) && item.children.length > 0 ? true : false;
      return (
        {
          key: `navigation-item-${item.label}-${index}-${level}`,
          label: getLabel(item),
          showArrow: childExist,
          ...(childExist && { children: getChildren(item) }),
          className: Styles[className.collapseClass],
        }
      )
    })
  )
}
interface MobileNavigationModelProps {
  navigationList: any;
  toggleMobileNavigationPanel: () => void;
  classNames: Array<{ collapseClass: string, fontClass: string }>,
  level: number
}
const MobileNavigationModel = ({ navigationList, toggleMobileNavigationPanel, classNames, level }: MobileNavigationModelProps) => {
  if (!navigationList || !Array.isArray(navigationList)) {
    return null;
  }

  return (
    <Collapse
      destroyInactivePanel
      expandIconPosition={"end"}
      ghost
      bordered={false}
      // style={{ fontFamily: "MonsalGothicMedium" }}
      items={
        getcollapsedItem(
          navigationList,
          classNames[level],
          toggleMobileNavigationPanel,
          classNames,
          level + 1
        )
      }
      expandIcon={({ isActive }) => <Image src={`/icons/expand-icon.svg`} alt={`expand-icon`} height={8} width={14} style={{ rotate: isActive ? "180deg" : "" }} />}
      rootClassName={Styles.collapseRootClass}
      accordion={true}
    />
  )
}

export default MobileNavigationModel