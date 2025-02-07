"use client"

import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import ActivityCalendar, { Activity } from "react-activity-calendar";
import React from 'react';

type CalendarProps = {
  data: Activity[]
}

export default function Calendar({data}: CalendarProps) {


  return (
    <>
      <ActivityCalendar
        data={data}
        renderBlock={(block, activity) =>
          React.cloneElement(block, {
            'data-tooltip-id': 'react-tooltip',
            'data-tooltip-html': `${activity.count} activities on ${activity.date}`
          })
        }
          theme={{
            dark: ["#ebebeb","#4FBFA9"]
          }}
          blockSize={10}
          blockMargin={2}
      />
      <ReactTooltip id="react-tooltip" />
    </>

  )
}
