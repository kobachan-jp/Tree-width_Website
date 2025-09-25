import { useState } from 'react';

type CounterProps = {
  initialValue: number;
};

//propsのinitialValueに初期値をセット
//<Counter initialValue= {0}/>
const Counter = (props: CounterProps) => {
  const { initialValue } = props;
  const [count, setCount] = useState(initialValue);

  return (
    <div>
      <p>Count: {count}</p>
      {/*setCountを呼ぶことで状態を更新*/}
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>
    </div>
  );
};

export default Counter;
