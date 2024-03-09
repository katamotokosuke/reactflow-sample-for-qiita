import React, {useMemo} from 'react';
import './App.css';
import {Background, Controls, MarkerType, ReactFlow} from "reactflow";

// このcssのimportがないと、reactflowの描画が崩れるので必要
import 'reactflow/dist/style.css';
import {MyNode} from "./Node";
import MyEdge from "./Edge";

function App() {
  const nodeTypes = useMemo(() => ({ myNode: MyNode }), []);
  const edgeTypes = useMemo(() => ({ myEdge: MyEdge}), []);
  const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' }, type: 'myNode'},
    { id: '2', position: { x: 50, y: 100 }, data: { label: '2' }, type: 'myNode' },
  ];
  // source: edgeの元となるnodeのidを指定
  // target: edgeの先となるnodeのidを指定
  // id: reactflowのドキュメントは sourceEdgeId-targetEdgeId という形式で書かれているが、多分なんでもOK
  const initialEdges = [
      { id: '1-2', source: '1', target: '2', type: 'myEdge', markerEnd: {type: MarkerType.ArrowClosed, width: 10, height: 10, color: '#FF0072'}}
  ];

  return (
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
            nodes={initialNodes}
            edges={initialEdges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
        >
            <Background />
            <Controls />
        </ReactFlow>
      </div>
  );
}

export default App;
