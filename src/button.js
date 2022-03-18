import useSound from 'use-sound';
import './button.css';
import timeMachine from './timeMachine.mp3';

const BoopButton = () => {
  const [play, {pause, stop}] = useSound(timeMachine, {volume: .1});

  return( 
    <div className='button-container'>
        <button className='button' onClick={()=> play()}>Play!</button>
        <button className='button' onClick={()=> pause()}>Pause!</button>
        <button className='button' onClick={()=> stop()}>Stop!</button> 
    </div>
  )
};

export default BoopButton