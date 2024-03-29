import { Link } from 'react-router-dom'
import styles from './PressButton.module.scss'

interface Props {
	link?: string
	text: string
}

export default function PressButton({ link, text }: Props) {
	return (
		<Link to={link || '#'} style={{ minWidth: '20%' }}>
			<button className={styles.button}>{text}</button>
		</Link>
	)
}
