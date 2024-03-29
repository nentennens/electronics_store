import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import ResetAndDoneBtns from '../../../../../components/ResetAndDoneBtns'

import getPrices from '../../hooks/usePrices'

import styles from './Price.module.scss'

export default function PriceFilter({ closeFilter }: { closeFilter: () => void }) {
	const [searchParams, setSearchParams] = useSearchParams()
	const [minPrice, maxPrice] = getPrices()

	const priceParam = searchParams.get('price')

	const [inputFrom, setInputFrom] = useState(minPrice)
	const [inputTo, setInputTo] = useState(maxPrice)

	function resetPrices() {
		setInputFrom(minPrice)
		setInputTo(maxPrice)
		searchParams.delete('price')
		setSearchParams(searchParams)
	}

	function setPrices()  {
		closeFilter()
		searchParams.set('price', `${inputFrom}-${inputTo}`)
		setSearchParams(searchParams)
	}

	useEffect(() => {
		setInputFrom(priceParam?.split('-')[0].replace(/\D/g, '') || minPrice)
		setInputTo(priceParam?.split('-')[1]?.replace(/\D/g, '') || maxPrice)
	}, [minPrice, maxPrice, window.location.href])

	return (
		<>
			<div className={styles.wrapper}>
				<div className={styles.inputWrapper}>
					<p style={{ color: '#646464' }}>From</p>

					<input
						type='text'
						value={inputFrom}
						onChange={e => setInputFrom(e.target.value.replace(/\D/g, ''))}
						className={styles.input}
					/>
				</div>

				<div className={styles.inputWrapper}>
					<p style={{ color: '#646464' }}>To</p>

					<input
						type='text'
						value={inputTo}
						onChange={e => setInputTo(e.target.value.replace(/\D/g, ''))}
						className={styles.input}
					/>
				</div>
			</div>

			<ResetAndDoneBtns condition={!!priceParam} resetFunc={resetPrices} doneFunc={setPrices} />
		</>
	)
}
