import { useState, useRef, useEffect } from 'react'
import './index.css'
import Quagga, { calculatePatchSize } from 'quagga';
import Webcam from 'react-webcam';

function App() {
  const webref = useRef(null)
  const [found, setfound] = useState(null)
  const [isLoading, setisloading] = useState(null)

  useEffect(() => {
    if(webref.current){
      console.log(webref.current)
      Quagga.init({
        inputStream : {
          name : "Live",
          type : "LiveStream",
          target: webref.current.video,
        },
        decoder : {
          readers: ["ean_8_reader"]
        },
        locate: true,
        debug: true,
      }, function(err) {
          if (err) {
              console.log(err);
              return
          }
          console.log("Initialization finished. Ready to start");
          Quagga.start();



          Quagga.onDetected((result) => {
            handeldeteckted(result)
          });

      });


      return() => {
        Quagga.stop()
        Quagga.offDetected()
      }
    
    }
  },[])

const handeldeteckted = (result) => {
  if(!isLoading){
    setisloading(true)
    console.log("Barcode detected:", result.codeResult.code);

    // Re-enable detection after 2 seconds
    setTimeout(() => {
      setisloading(false);
    }, 2000);

    return(
      <>
        <dialog className='w-96 h-[90vh] bg-white'>
          <h1 className='font-bold text-3xl'>Hello</h1>
        </dialog>
      </>
    )
  }
}



  return (
    <div className='w-[100vw] h-[100vh] bg-red-400'>
      <div className='m-auto'>
      <Webcam ref={webref}/>
      </div>
    </div>
  )
}

export default App
