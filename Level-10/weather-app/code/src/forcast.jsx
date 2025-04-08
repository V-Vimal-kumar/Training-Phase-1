import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading } from 'react-accessible-accordion'
import React from 'react'
import './forecast.css'

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function Forcast({ data }) {
  const dayInWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInWeek));

  // console.log(forecastDays);

  const iconMap = {
    "01d": "sunny.png",
    "01n": "cloud.png",
    "02d": "cloud.png",
    "02n": "cloud.png",
    "03d": "cloud.png",
    "03n": "cloud.png",
    "04d": "cloud.png",
    "04n": "cloud.png",
    "09d": "Rainy.png",
    "09n": "Rainy.png",
    "10d": "Rainy.png",
    "10n": "Rainy.png",
    "11d": "storm.png",
    "11n": "storm.png",
    "13d": "snow.png",
    "13n": "snow.png",
    "50d": "wind.png",
    "50n": "wind.png"
  };


  return (
    <div>
      <label>Next 7 Days</label>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, ind) => (
          <AccordionItem key={ind}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    alt="weather"
                    className="icon-small"
                    src={`./icons/${iconMap[item.weather[0].icon]}`}
                  />
                  <label className='day'>{forecastDays[ind]}</label>
                  <label className='description'>{item.weather[0].description}</label>
                  <label className='min-max'>{Math.round(item.main.temp_min)}°C/{Math.round(item.main.temp_max)}°C</label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default Forcast