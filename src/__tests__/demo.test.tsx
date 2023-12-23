import { render, screen } from '@/test/app-test-utils'
import Page from '../app/page'

test('Home page', async () => {
  await render(<Page />, { route: '/' })
  expect(
    screen.getByRole('heading', { level: 1, name: /Compendium/i })
  ).toBeInTheDocument()
})
