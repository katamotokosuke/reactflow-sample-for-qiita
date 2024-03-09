import {Handle, Node, NodeProps, Position} from 'reactflow';

export type NodeData = {
    label: string;
}

export function MyNode({ id, data }: NodeProps<NodeData>) {
    return (
        <>
            <Handle
                id={`${id}-target`}
                type="target"
                position={Position.Top}
            />
            <div
                style={{
                    background: 'green',
                    padding: 10,
                    borderRadius: 5,
                    width: 20,
                    height: 20,
                }}>
                <strong>{data.label}</strong>
            </div>
            <Handle
                id={`${id}-source`}
                type="source"
                position={Position.Bottom}
            />
        </>
    );
}