import React from 'react';
import styled from 'styled-components';

interface IProps {
    children: any;
}

const NecessityTemplateBlock = styled.div`
    width: 512px;
    height: 600px;

    position: relative;
    // 박스 하단에 추가 버튼 위치시키기 위한 설정

    background: white;
    border-radius: 16px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

    margin: 0 auto;
    // 페이지 중앙에 나타나도록 설정

    margin-top: 80px;
    margin-bottom: 32px;
    display: flex;
    flex-direction: column;
`;

function NecessityTemplate({ children, ...props }: IProps) {
    return <NecessityTemplateBlock {...props}>{children}</NecessityTemplateBlock>;
}

export default NecessityTemplate;
