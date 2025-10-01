import type {RefObject} from 'react';

type Props = {
    observerRef: RefObject<HTMLDivElement | null>
    isFetchingNextPage: boolean
}

export const LoadingTrigger = ({ observerRef, isFetchingNextPage }: Props) => {
    return (
        <div ref={observerRef}>
            {isFetchingNextPage ? 'Loading more tracks...' : <div style={{height: '20px'}}></div>}
        </div>
    );
};

