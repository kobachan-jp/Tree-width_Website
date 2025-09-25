import React, { memo, useState } from 'react';

type FizzProps = {
  isFizz: boolean;
};

//Fizzは通常の関数コンポーネント
//isFizzはtrueの場合はFizzと表示し、それ以外は何も表示しな
//isFizzの変化に関わらず、親が再描画されるとFizzも再描画される
const Fizz = (props: FizzProps) => {
  const { isFizz } = props;
  console.log(`Fizzが再描画されました, isFizz = ${isFizz}`);
  return <span>{isFizz ? 'Fizz' : ''}</span>;
};

type BuzzProps = {
  isBuzz: boolean;
  //propsにonClickを追加
  onClick: () => void;
};

//Buzzはメモ化した関数コンポーネント
//isBuzzはtrueの場合はBuzzと表示し、それ以外は何も表示しない
//親コンポーネントが再描画されても、isBuzzが変化しない限りはBuzzは再描画しない
const Buzz = memo<BuzzProps>((props) => {
  const { isBuzz, onClick } = props;
  console.log(`Buzzが再描画されました, isBuzz=${isBuzz}`);
  return <span onClick={onClick}>{isBuzz ? 'Buzz' : ''}</span>;
});

//この形でexportしたときはimport {Parent} fromで読み込む
export const Parent2 = () => {
  const [count, setCount] = useState(1);
  const isFizz = count % 3 === 0;
  const isBuzz = count % 5 === 0;
  //この関数はParent2の再描画の度に作成される
  const onBuzzClick = () => {
    console.log(`Buzzがクリックされました, isBuzz=${isBuzz}`);
  };
  console.log(`Parentが再描画されました, count = ${count}`);
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
      <p>{`現在のカウント: ${count}`}</p>
      <p>
        <Fizz isFizz={isFizz} />
        <Buzz isBuzz={isBuzz} onClick={onBuzzClick} />
      </p>
    </div>
  );
};
