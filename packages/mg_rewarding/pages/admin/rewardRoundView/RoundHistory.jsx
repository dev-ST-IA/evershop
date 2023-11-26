/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import { Card } from '@components/admin/cms/Card';
import './RoundHistory.scss'

export default function RoundHistory({ rewardRoundHistory = [] }) {
  const dailyActivities = [];
  let current = null
  rewardRoundHistory.forEach((element) => {
    if (!current) {
      current = {
        description: element?.description,
        time: element.createdAt.time,
        date: element.createdAt.date
      }
      dailyActivities.push({
        date: element.createdAt.date,
        activities: [
          current
        ]
      });
    } else if (
      element.createdAt.date ===
      current?.date
    ) {
      current = {
        description: element?.description,
        time: element?.createdAt.time,
        date: element.createdAt.date
      }
      dailyActivities[dailyActivities.length-1].activities.push(current);
    } else {
      current = {
        description: element?.description,
        time: element.createdAt.time,
        date: element.createdAt.date
      }
      dailyActivities.push({
        date: element?.createdAt.date,
        activities: [
          current
        ]
      });
    }
  });

  return (
    <Card title="Winner Details" subdued>
      <Card.Session>
        <div className='rewardRoundHistory'>
          <ul>
            {dailyActivities.map((group, i) => (
              <li key={i} className="group">
                <span className="group-date">{group.date}</span>
                <ul>
                  {group.activities.map((a, k) => (
                    <li key={k} className="flex items-center group-item">
                      <span className="dot" />
                      <div className="comment">
                        <span>{a.description}</span>
                      </div>
                      <span className="time">{a.time}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </Card.Session>
    </Card>
  );
}

RoundHistory.propTypes = {
  rewardRoundHistory: PropTypes.instanceOf(Array)
};

RoundHistory.defaultProps = {
  rewardRoundHistory: []
};

export const layout = {
  areaId: 'roundView-leftSide',
  sortOrder: 15
};

export const query = `
  query Query {
    rewardRoundHistory(id: getContextValue("roundId", null)) {
      description
      createdAt {
        value
        timezone
        date: text(format: "LLL dd")
        time: text(format: "t")
      }
    }
  }
`;
