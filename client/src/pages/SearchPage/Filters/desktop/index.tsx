import { useSearchParams } from 'react-router-dom'

import SortFilter from './Sort'
import CheckFilter from './CheckFilter'
import PriceFilter from './Price'
import AllFilters from './AllFilters'

import { DownArrow, ArrowsDownUpSVG, SettingsSVG } from '../../../../icons'

import styles from './Desktop.module.scss'

interface Props {
	activeFilter: number
	setActiveFilter: React.Dispatch<React.SetStateAction<number>>
	allFiltersIndex: number
}

export default function FiltersDesktop({ activeFilter, setActiveFilter, allFiltersIndex }: Props) {
	const [searchParams] = useSearchParams()

	const sortParam = searchParams.get('sort')?.replace(/_/g, ' ') || 'By popularity'

	const categoryCount = searchParams.get('category')?.split(' ').length
	const brandCount = searchParams.get('brand')?.split(' ').length
	const priceCount = searchParams.get('price') ? 1 : null

	function closeFilter() {
		setActiveFilter(0)
	}

	function changeFilter(index: number) {
		setActiveFilter(index === activeFilter ? 0 : index)
	}

	const filters = [
		{ icon: <ArrowsDownUpSVG className={styles.button__icon} />, name: sortParam, html: <SortFilter closeFilter={closeFilter} /> },
		{ name: 'Category', html: <CheckFilter param="category" list={1} closeFilter={closeFilter} />, count: categoryCount },
		{ name: 'Brand', html: <CheckFilter param="brand" list={2} closeFilter={closeFilter} />, count: brandCount },
		{ name: 'Price, $', html: <PriceFilter closeFilter={closeFilter} />, count: priceCount }
	]

	return (
		<div className={styles.wrapper}>
			{filters.map((filter, i) => (
				<div className={styles.filterBlock} key={i}>
					<button
						onClick={() => changeFilter(i + 1)}
						className={
							activeFilter === i + 1
								? `${styles.button} ${styles['button--active']}`
								: styles.button
						}
					>
						{filter.icon}
						{filter.name}
						<DownArrow className={styles.button__arrow} />

						{filter.count && (
							<span className={styles.filterCount}>
								<span>{filter.count}</span>
							</span>
						)}
					</button>

					<div
						style={activeFilter === i + 1 ? {} : { display: 'none' }}
						className={styles.filterMenu}
					>
						{filter.html}
					</div>
				</div>
			))}

			{activeFilter !== 0 && <div onClick={closeFilter} className={styles.filterMenu__overlay} />}

			<div className={styles.allFilters}>
				<button
					onClick={() => changeFilter(allFiltersIndex)}
					className={styles.allFilters__button}
				>
					<SettingsSVG className={styles.allFilters__icon} />
					All filters
					{(categoryCount || brandCount || priceCount) && (
						<span className={styles.filterCount}>
							<span>{(categoryCount || 0) + (brandCount || 0) + (priceCount || 0)}</span>
						</span>
					)}
				</button>

				<AllFilters 
					closeFilter={closeFilter}
					activeFilter={activeFilter}
					allFiltersIndex={allFiltersIndex}
				/>

				{activeFilter === allFiltersIndex && (
					<div onClick={closeFilter} className={styles.allFilters__overlay} />
				)}
			</div>
		</div>
	)
}
