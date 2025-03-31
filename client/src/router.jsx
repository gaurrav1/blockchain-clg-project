import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from './layouts/RootLayout'
import { Home } from './pages/Home'
import { CreateCampaign } from "./pages/CreateCampaign";
import { CampaignPage } from "./pages/CampaignPage";

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <RootLayout />,
            children: [
                {
                    index: true,
                    element: <Home />
                },
                {
                    path: "/profile",
                    element: <h1>Profile</h1>
                },
                {
                    path: "/create-campaign",
                    element: <CreateCampaign />
                },
                {
                    path: "/campaign-details/:id",
                    element: <CampaignPage />
                }
            ]

        }
    ]
)