import React from 'react'
import { useDispatch } from 'react-redux'
import eng from '../../../assets/icons/eng.png'
import ru from '../../../assets/icons/ru.png'
import uz from '../../../assets/icons/uz.png'
import { changeLang } from '../../../redux/localeSlice'
import './style.css'


const ChangeLanguage = () => {
  const dispatch = useDispatch()

  return (
    <div className='changingLanguage'>

      <div className='language_circle-wrapper'>
      <button onClick={() => dispatch(changeLang('en'))}>
        <img src={eng} alt="eng" />
      </button>
        <span>Eng</span>
        </div>

        <div className='language_circle-wrapper'>
      <button onClick={() => dispatch(changeLang('ru'))}>
        <img src={ru} alt="ru" />
      </button>
        <span>Rus</span>
          </div>

        <div className='language_circle-wrapper'>
      <button onClick={() => dispatch(changeLang('uz'))}>
        <img src={uz} alt='uz' />
      </button>
        <span>Uzb</span>
      </div>

        <div className='language_circle-wrapper'>
      <button onClick={() => dispatch(changeLang('krill'))}>
        <img src={uz} alt="uzKrill" />
      </button>
        <span>UzKrill</span>
        </div>
    </div>
  )
}

export default ChangeLanguage