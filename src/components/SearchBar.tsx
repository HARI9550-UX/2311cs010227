import { TextField } from '@mui/material'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <TextField
      fullWidth
      label="Search notifications"
      value={value}
      onChange={event => onChange(event.target.value)}
      variant="outlined"
    />
  )
}
