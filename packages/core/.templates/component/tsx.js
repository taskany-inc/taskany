module.exports.template = (_, fileName) => `import React from 'react';
import styled from 'styled-components';

interface ${fileName}Props {}

export const ${fileName}: React.FC<${fileName}Props> = (props) => {
    return (
        <div></div>
    );
};
`;
