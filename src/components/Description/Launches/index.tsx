import React, {useState, useEffect} from 'react'

import {rocketsStore} from '../../../stores'
import {ILaunchesData} from '../../../interfaces'

import S from '../styles.module.css'
import {DescriptionRockets} from '../Rockets'

export const DescriptionLaunches: React.FC<{
  launchesItem: ILaunchesData
}> = ({launchesItem}) => {
  const [showRocketInfo, setShowRocketInfo] = useState(false)

  useEffect(() => {
    rocketsStore.getItem(launchesItem.rocket)
  }, [launchesItem.rocket]);

  const rocketItem = rocketsStore.rocketItem;

  if (typeof launchesItem !== 'undefined' && typeof rocketItem !== 'undefined') return (
    <div className={S.rocketList}>
      <div className={S.rocketList__item}>
        <div>
          <strong>Rocket:</strong>
        </div>

        <div key={rocketItem.id}>
          <button
            className={S.rocketList__button}
            onClick={() => setShowRocketInfo(!showRocketInfo)}>
            {rocketItem.name} {showRocketInfo ? '[↑]' : '[↓]'}
          </button>
          {showRocketInfo && <DescriptionRockets rocketsItem={rocketItem} />}
        </div>
      </div>
      <div className={S.rocketList__item}>
        <strong>Success:</strong>
        {launchesItem.success ? (
          <span className={S.success}>Success</span>
        ) : (
          <span className={S.failure}>Failure</span>
        )}
      </div>
      <div className={S.rocketList__item}>
        <strong>Flight number: </strong>
        {launchesItem.flight_number}
      </div>
      <div className={S.rocketList__item}>
        <strong>Webcast: </strong>
        <a href={launchesItem.links.webcast} target="_blank" rel="noreferrer">
          {launchesItem.links.webcast}
        </a>
      </div>
      <div className={S.rocketList__item}>
        <strong>Wikipedia: </strong>{' '}
        <a href={launchesItem.links.wikipedia} target="_blank" rel="noreferrer">
          {launchesItem.links.wikipedia}
        </a>
      </div>
    </div>
  )
  return <div>Full description not found</div>
}
