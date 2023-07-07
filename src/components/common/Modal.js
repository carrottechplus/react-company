import { forwardRef, useState, useImperativeHandle, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// mount 가 될때는 transition 주고 할 수 있는데 다른 페이지 넘어갈때 (unmount)될때는 transition이 불가능했음. 위 framer-motion을 사용하여 모션이 사라질떄까지 unmount 딜레이 되는 라이브러리 사용.

const Modal = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);

	useImperativeHandle(ref, () => {
		return { open: () => setOpen(true) };
	});

	useEffect(() => {
		Open ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto');
	}, [Open]);

	return (
		// 주의 할 점 : AnimatePresence 사용시 내부 컴포넌트에 연결되어 있는 ref값을 제거
		// react 17버전에서는 framer-motion을 6버전대로 설치.
		// 컴포넌트가 unmount시 모션 효과가 끝날때까지 unmount를 지연시켜줌.
		<AnimatePresence>
			{Open && (
				// 모션을 걸고 싶은 컴포넌트에 motion. 지정, initial(모션 시작), animate(모션 완료), exit(사라지는 모션) 속성 지정
				<motion.aside
					className='modal'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, transition: { duration: 0.5 } }}
					exit={{ opacity: 0, scale: 0, transition: { duration: 0.3 } }}
				>
					<motion.div
						initial={{ opacity: 0, scaleY: 0 }}
						animate={{
							opacity: 1,
							scaleY: 1,
							originY: 0,
							transition: { ease: 'easeInOut', delay: 1, duration: 0.5 },
						}}
						className='con'
					>
						{props.children}
					</motion.div>
					<span className='close' onClick={() => setOpen(false)}>
						Close
					</span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
});
export default Modal;

/*
  useRef로 참조객체 연결은 JSX는 가능하다 사용자가 직접 만든 컴포넌트는 불가
  - 해결 방법은 참조하려고 하는 컴포넌트 내부에서 forwardRef를 이용하여 
  - 자기 자신을 참조객체에 연결해서 부모에게 역으로 전달처리
  forwardRef
  - 자식 컴포넌트 요소를 호출하는 부모컴포넌트에 역으로 참조해서 전달
*/
