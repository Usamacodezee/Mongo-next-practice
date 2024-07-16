/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import HomePage from '../app/page'

describe('HomePage', () => {
    it('renders a heading', () => {
        render(<HomePage />)

        const heading = screen.getByRole('heading', { level: 1 })

        expect(heading).toBeInTheDocument()
    })
})