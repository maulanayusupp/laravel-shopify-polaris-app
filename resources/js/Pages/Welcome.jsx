import { Link, Head } from '@inertiajs/react';
import Shopified from "@/Layouts/Shopified";
import {useState, useCallback, useMemo} from 'react';
import {Page, Card, Button, CalloutCard, VerticalStack} from '@shopify/polaris';
import {Autocomplete, Icon} from '@shopify/polaris';
import {SearchMinor} from '@shopify/polaris-icons';
import {Select} from '@shopify/polaris';
import {Checkbox} from '@shopify/polaris';
import {TextField} from '@shopify/polaris';


const Welcome = ({ auth, laravelVersion, phpVersion }) => {
    const APP_TITLE = 'Laravel Shopify Polaris';
    const PAGE_NAME = `Laravel Version ${laravelVersion} with PHP ${phpVersion}`;

    // Handle submit
    function handleSubmit(e) {
        e.preventDefault()
        console.log(PAGE_NAME);
    }

    // Autocomplete
    const deselectedOptions = useMemo(() => [
            {value: 'rustic', label: 'Rustic'},
            {value: 'antique', label: 'Antique'},
            {value: 'vinyl', label: 'Vinyl'},
            {value: 'vintage', label: 'Vintage'},
            {value: 'refurbished', label: 'Refurbished'},
        ],
        [],
    );
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState(deselectedOptions);
    const updateText = useCallback((value) => {
        setInputValue(value);

        if (value === '') {
            setOptions(deselectedOptions);
            return;
        }

        const filterRegex = new RegExp(value, 'i');
        const resultOptions = deselectedOptions.filter((option) =>
            option.label.match(filterRegex),
        );
        setOptions(resultOptions);
        },
        [deselectedOptions],
    );
    const updateSelection = useCallback((selected) => {
        const selectedValue = selected.map((selectedItem) => {
            const matchedOption = options.find((option) => {
            return option.value.match(selectedItem);
            });
            return matchedOption && matchedOption.label;
        });

        setSelectedOptions(selected);
        setInputValue(selectedValue[0] || '');
        },
        [options],
    );
    const textField = (
        <Autocomplete.TextField
            onChange={updateText}
            label="Tags"
            value={inputValue}
            prefix={<Icon source={SearchMinor} color="base" />}
            placeholder="Search"
            autoComplete="off"
        />
    );

    // Checkbox
    const [checked, setChecked] = useState(false);
    const handleChange = useCallback(
        (newChecked) => setChecked(newChecked),
        [],
    );

    // Select
    const [selected, setSelected] = useState('today');
    const handleSelectChange = useCallback(
        (value) => setSelected(value),
        [],
    );
    const selectOptions = [
        {label: 'Today', value: 'today'},
        {label: 'Yesterday', value: 'yesterday'},
        {label: 'Last 7 days', value: 'lastWeek'},
    ];

    // Text Input
    const [value, setValue] = useState('Maulana Yusup Abdullah');

    const handleInput = useCallback(
        (newValue) => setValue(newValue),
        [],
    );

    return (
        <>
            <Head title={APP_TITLE} />

            {/* Polaris */}
            <Page title={PAGE_NAME}>
                <VerticalStack gap="5">
                    <Card title={ auth.name } sectioned>
                        <Button
                            primary
                            onClick={handleSubmit}
                        >
                            Click Me {inputValue} and Name: {value}
                        </Button>
                    </Card>

                    <CalloutCard
                        title="Customize the style of your checkout"
                        illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
                        primaryAction={{
                            content: 'Customize checkout',
                            url: '#',
                        }}
                        >
                        <p>Upload your store’s logo, change colors and fonts, and more.</p>
                    </CalloutCard>

                    {/* Autocomplete */}
                    <div>
                        <Autocomplete
                            options={options}
                            selected={selectedOptions}
                            onSelect={updateSelection}
                            textField={textField}
                        />
                    </div>

                    {/* Checkbox */}
                    <Checkbox
                        label="Basic checkbox"
                        checked={checked}
                        onChange={handleChange}
                    />

                    {/* Select */}
                    <Select
                        label="Date range"
                        options={selectOptions}
                        onChange={handleSelectChange}
                        value={selected}
                    />

                    {/* Text input */}
                    <TextField
                        label="Store name"
                        value={value}
                        onChange={handleInput}
                        autoComplete="off"
                    />

                </VerticalStack>
            </Page>
        </>
    );
}


Welcome.layout = page => <Shopified children={page} title="Welcome"/>

export default Welcome;
