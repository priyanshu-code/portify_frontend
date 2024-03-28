'use client';
import s from './Loading.module.css';
export default function Loading() {
  return (
    <main className={s.body}>
      <div className={s.boxes}>
        <div className={s.box}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={s.box}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={s.box}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={s.box}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </main>
  );
}
