import { Link, Head } from '@inertiajs/react';
import Shopified from "@/Layouts/Shopified";
import {Page, Card, Button} from '@shopify/polaris';

const Welcome = ({ auth, laravelVersion, phpVersion }) => {
    const APP_NAME = `Laravel Version ${laravelVersion} with PHP ${phpVersion}`;

    // Handle submit
    function handleSubmit(e) {
        e.preventDefault()
        console.log(APP_NAME);
    }

    return (
        <>
            <Head title="Laravel Shopify Polaris" />

            {/* Polaris */}
            <Page title={APP_NAME}>
                <Card title={ auth.name } sectioned>
                    <Button
                        primary
                        onClick={handleSubmit}
                    >
                        Click Me
                    </Button>
                </Card>
            </Page>

        </>
    );
}


Welcome.layout = page => <Shopified children={page} title="Welcome"/>

export default Welcome;
