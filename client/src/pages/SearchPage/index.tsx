import React from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

import { useAppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'
import { fetchItems } from '../../redux/reducers/items/asyncActions'
import { getItemsArray, getItemsStatus } from '../../redux/reducers/items/selectors'
import { Status } from '../../types'

import FiltersDesktop from './Filters/desktop'
import FiltersMobile from './Filters/mobile'
import Items from './Items'

import styles from './styles.module.scss'

export default function SearchPage(): React.ReactElement {
	const dispatch = useAppDispatch()
	const location = useLocation()
	const [searchParams] = useSearchParams()

	const query = searchParams.get('query')
	const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)
	const [activeFilter, setActiveFilter] = React.useState<number>(0)
	const allFiltersIndex = 5

	const status = useSelector(getItemsStatus)
	const data = useSelector(getItemsArray).filter(
		item =>
			item.title.toLowerCase().includes(query?.toLowerCase() || '') ||
			item.description.toLowerCase().includes(query?.toLowerCase() || '')
	)

	React.useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth)

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	React.useEffect(() => {
		dispatch(fetchItems())
	}, [location.pathname])

	if (status === Status.PENDING)
		return <h1 className={styles.statusHeader}>Loading...</h1>

	if (!data.length && status === Status.FULFILLED) {
		return (
			<h1 className={styles.statusHeader}>
				Nothing was found for the query "{query}" :(
			</h1>
		)
	}

	if (status === Status.REJECTED)
		return <h1 className={styles.statusHeader}>Failed to get items :(</h1>

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.header}>Search results for "{query}"</h1>

			{windowWidth > 1023 ? (
				<FiltersDesktop
					activeFilter={activeFilter}
					setActiveFilter={setActiveFilter}
					allFiltersIndex={allFiltersIndex}
				/>
			) : (
				<FiltersMobile
					activeFilter={activeFilter}
					setActiveFilter={setActiveFilter}
					allFiltersIndex={allFiltersIndex}
				/>
			)}

			<div className={styles.items}>
				<Items />
			</div>
		</div>
	)
}
