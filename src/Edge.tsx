import {BaseEdge, EdgeProps, getSmoothStepPath} from 'reactflow';

export default function MyEdge({ id, sourceX, sourceY, targetX, targetY, markerEnd }: EdgeProps) {
    const [edgePath] = getSmoothStepPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    return (
        <>
            <BaseEdge
                id={id}
                path={edgePath}
                markerEnd={markerEnd}
                style={{
                    stroke: 'red',
                    strokeWidth: 2,
                }}
            />
        </>
    );
}