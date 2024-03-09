import React from 'react';
import './App.css';
import {ReactFlow} from "reactflow";

// このcssのimportがないと、reactflowの描画が崩れるので必要
import 'reactflow/dist/style.css';

function App() {
  const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  ];
  // source: edgeの元となるnodeのidを指定
  // target: edgeの先となるnodeのidを指定
  // id: reactflowのドキュメントは sourceEdgeId-targetEdgeId という形式で書かれているが、多分なんでもOK
  const initialEdges = [{ id: '1-2', source: '1', target: '2' }];

  return (
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow nodes={initialNodes} edges={initialEdges} />
      </div>
  );
}

export default App;
