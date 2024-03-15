import React, {useCallback, useMemo} from 'react';
import './App.css';
import {
    addEdge,
    Background,
    Connection,
    Controls,
    getOutgoers,
    MarkerType, Node,
    ReactFlow, ReactFlowProvider,
    useEdgesState,
    useNodesState, useReactFlow
} from "reactflow";

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
    { id: '3', position: { x: 150, y: 100 }, data: { label: '3' }, type: 'myNode' },
  ];
  // source: edgeの元となるnodeのidを指定
  // target: edgeの先となるnodeのidを指定
  // id: reactflowのドキュメントは sourceEdgeId-targetEdgeId という形式で書かれているが、多分なんでもOK
  const initialEdges = [
      { id: '1-2', source: '1', target: '2', type: 'myEdge', markerEnd: {type: MarkerType.ArrowClosed, width: 10, height: 10, color: '#FF0072'}}
  ];

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const { getNodes, getEdges } = useReactFlow();
    const onConnect = (params: Connection) => {
        setEdges((eds) => addEdge(params, eds));
    }
    const isValidConnection = useCallback((connection: Connection) => {
            const nodes = getNodes();
            const edges = getEdges();
            const target = nodes.find((node: Node) => node.id === connection.target);
            if (!target) return false;
            const hasCycle = (node: Node, visited = new Set()) => {
                if (visited.has(node.id)) return false;

                visited.add(node.id);

                for (const outgoer of getOutgoers(node, nodes, edges)) {
                    if (outgoer.id === connection.source) return true;
                    if (hasCycle(outgoer, visited)) return true;
                }
            };

            if (target.id === connection.source) return false;
            return !hasCycle(target);
        },
        [getNodes, getEdges],
    );

  return (
      <div style={{ width: '100vw', height: '100vh' }}>
          <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              isValidConnection={isValidConnection}
              onConnect={onConnect}
              defaultEdgeOptions={{
                  type: 'myEdge',
                  markerEnd: {
                      type: MarkerType.ArrowClosed,
                      width: 10,
                      height: 10,
                      color: '#FF0072'
                  }
              }}
          >
              <Background />
              <Controls />
          </ReactFlow>
      </div>
  );
}

export default () => (
    <ReactFlowProvider>
        <App />
    </ReactFlowProvider>
)
