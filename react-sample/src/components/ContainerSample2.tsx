import React from 'react';

type ContainerProps = {
  title: string;
  children: React.ReactNode;
};

const Container = (props: ContainerProps): React.JSX.Element => {
  const { title, children } = props;

  return (
    <div style={{ background: 'yellow' }}>
      <span>{title}</span>
      {/*propsのchildrenを埋め込むと,このコンポーネントの開始タグと閉じタグで囲んだ要素を表示する*/}
      <div>{children}</div>
    </div>
  );
};

const Parents = (): React.JSX.Element => {
  return (
    //Containerを使用する際に、他の要素を囲って使用する
    <Container title="Hello">
      <p>ここの部分が背景色で囲まれる</p>
    </Container>
  );
};

export default Parents;
