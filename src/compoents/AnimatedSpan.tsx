import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components";

interface AnimatedSpanProps {
    /**
     * 内容
     */
    content: string
    /**
     * 持续时间/s
     */
    duration: number
}

function AnimatedSpan(props: AnimatedSpanProps) {
    const { content, duration } = props

    const defaultState = {
        contentWidth: 0,
        left: 0,
        duration,
    }

    const [state, setState] = useState(defaultState)

    let ref = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        const { offsetWidth, parentElement } = ref.current as HTMLParagraphElement

        setState({
            ...state,
            contentWidth: offsetWidth,
            left: parentElement!.offsetWidth,
        })
    }, [content])

    const { contentWidth, left, duration: timing } = state

    const animationName = `marquee_${contentWidth}`

    const Text = styled.p`
      position: relative;
      left: ${left}px;
      animation: ${animationName} ${timing}s linear infinite both;
      animation-play-state: running;
      animation-fill-mode: forwards;
  
      @keyframes ${animationName} {
        0% {
          transform: translateX(0px);
        }
  
        100% {
          transform: translateX(-${contentWidth + left}px);
        }
      }
    `

    return (
        <div className="marquee_box">
            <Text ref={ref}>{content}</Text>
        </div>
    )
}
AnimatedSpan.defaultProps = {
    content: '',
    duration: 3,
}

export default React.memo(AnimatedSpan)