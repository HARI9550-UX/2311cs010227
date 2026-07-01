import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import type { SelectChangeEvent } from '@mui/material/Select'
import type { NotificationType } from '../types/notification'
import { NOTIFICATION_TYPES } from '../services/api'

interface FilterProps {
  selected: NotificationType | ''
  onChange: (value: NotificationType | '') => void
}

export default function Filter({ selected, onChange }: FilterProps) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as NotificationType | ''
    onChange(value)
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="notification-filter-label">Filter</InputLabel>
      <Select
        labelId="notification-filter-label"
        value={selected}
        label="Filter"
        onChange={handleChange}
      >
        <MenuItem value="">All</MenuItem>
        {NOTIFICATION_TYPES.map(type => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
