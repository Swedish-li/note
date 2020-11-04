import * as React from 'react'

export const Avatar = ({ src, alt, ...rest }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <a {...rest} style={{ padding: '1em' }}>
            <img
                src={src}
                alt={alt}
                style={{ borderRadius: '50%', width: '5em' }}
            />
        </a>
        <h3>
            <a {...rest}>我的博客</a>
        </h3>
    </div>
)
