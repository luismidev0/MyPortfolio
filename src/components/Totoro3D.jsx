import { useEffect, useRef, useState } from 'react';
import { initTotoro3D } from '../three/scenes';

export default function Totoro3D({ label }) {
  const canvasRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const dispose = initTotoro3D(canvasRef.current, { onLoaded: () => setLoaded(true) });
    return dispose;
  }, []);

  return (
    <div className="totoro3d-stage">
      <div className="totoro3d-canvas" ref={canvasRef}></div>
      <div className={'totoro3d-loader' + (loaded ? ' hide' : '')}>
        <img src="/assets/img/TotoroMovimiento.gif" alt="" />
      </div>
      <span className="te-cap">{label}</span>
    </div>
  );
}
