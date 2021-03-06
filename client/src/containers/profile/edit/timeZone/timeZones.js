export default [
	{
		label: 'United States',
		value: 'united_states',
		key: 'United States',
		children: [
			{
				label: 'Hawaii',
				value: 'Hawaii',
				key: 'Hawaii',
				UTC_offset: -10
			},
			{ label: 'Alaska', value: 'Alaska', key: 'Alaska', UTC_offset: -9 },
			{
				label: 'Pacific',
				value: 'US-Pacific',
				key: 'US-Pacific',
				UTC_offset: -8
			},
			{
				label: 'Mountain',
				value: 'US-Mountain',
				key: 'US-Mountain',
				UTC_offset: -7
			},
			{
				label: 'Central',
				value: 'US-Central',
				key: 'US-Central',
				UTC_offset: -6
			},
			{
				label: 'Eastern',
				value: 'US-Eastern',
				key: 'US-Eastern',
				UTC_offset: -5
			}
		]
	},
	{
		label: 'Canada',
		value: 'canada',
		key: 'Canada',
		children: [
			{
				label: 'Pacific',
				value: 'C-Pacific',
				key: 'C-Pacific',
				UTC_offset: -8
			},
			{
				label: 'Mountain',
				value: 'C-Mountain',
				key: 'C-Mountain',
				UTC_offset: -7
			},
			{
				label: 'Central',
				value: 'C-Central',
				key: 'C-Central',
				UTC_offset: -6
			},
			{
				label: 'Eastern',
				value: 'C-Eastern',
				key: 'C-Eastern',
				UTC_offset: -5
			},
			{
				label: 'Atlantic',
				value: 'Atlantic',
				key: 'Atlantic',
				UTC_offset: -4
			},
			{
				label: 'Newfoundland',
				value: 'Newfoundland',
				key: 'Newfoundland',
				UTC_offset: -3.5
			}
		]
	},
	{
		label: 'Europe',
		value: 'europe',
		key: 'Europe',
		children: [
			{ label: 'BST', value: 'BST', key: 'BST', UTC_offset: 1 },
			{ label: 'CEST', value: 'CEST', key: 'CEST', UTC_offset: 2 },
			{ label: 'CET', value: 'CET', key: 'CET', UTC_offset: 1 },
			{ label: 'EEST', value: 'EEST', key: 'EEST', UTC_offset: 3 }
		]
	},
	{
		label: 'Asia',
		value: 'asia',
		key: 'Asia',
		children: [
			{ label: 'India', value: 'India', key: 'India', UTC_offset: 5.5},
			{ label: 'China', value: 'China', key: 'China', UTC_offset: 8 },
			{ label: 'Korea', value: 'Korea', key: 'Korea', UTC_offset: 9 }
		]
	},
	{
		label: 'Africa',
		value: 'africa',
		key: 'Africa',
		children: [
			{ label: 'CVT', value: 'CVT', key: 'CVT', UTC_offset: -1},
			{ label: 'GMT', value: 'GMT', key: 'GMT', UTC_offset: 0 },
			{ label: 'WAT', value: 'WAT', key: 'WAT', UTC_offset: 1 },
			{ label: 'CAT', value: 'CAT', key: 'CAT', UTC_offset: 2 },
			{ label: 'EAT', value: 'EAT', key: 'EAT', UTC_offset: 3 },
			{ label: 'MUT', value: 'MUT', key: 'MUT', UTC_offset: 4 }
		]
	}
];
