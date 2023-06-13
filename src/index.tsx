import {
  ButtonItem,
  definePlugin,
  DialogButton,
  Menu,
  MenuItem,
  PanelSection,
  PanelSectionRow,
  Router,
  ServerAPI,
  showContextMenu,
  SliderField,
  staticClasses,
} from "decky-frontend-lib";
import { useState, VFC } from "react";
import { FaCarBattery } from "react-icons/fa";

import logo from "../assets/logo.png";
import { initializeController } from "./controller";

const Content: VFC<{ serverAPI: ServerAPI }> = ({ serverAPI }) => {
  const controller = initializeController(serverAPI);

  const [overchargeLevel, setOverchargeLevel] = useState<number>(controller.settings.overchargeLevel)
  const overchargeLevelOnChange = (value: number) => setOverchargeLevel(controller.setOverchargeLevel(value));

  return (
    <PanelSection title="Panel Section">
      <PanelSectionRow>
        <SliderField
          label="Overcharge Level"
          description="When to notify"
          value={overchargeLevel}
          step={5}
          max={100}
          min={0}
          showValue={true}
          validValues={(n: number) => 100 >= n && n >= 0 && n == Math.trunc(n)}
          disabled={false} // TODO: Restore comparison to other sliders
          editableValue={true}
          onChange={overchargeLevelOnChange}
        />
      </PanelSectionRow>

      <PanelSectionRow>
        <ButtonItem
          layout="below"
          onClick={(e: any) =>
            showContextMenu(
              <Menu label="Menu" cancelText="CAAAANCEL" onCancel={() => {}}>
                <MenuItem onSelected={() => {}}>Item #1</MenuItem>
                <MenuItem onSelected={() => {}}>Item #2</MenuItem>
                <MenuItem onSelected={() => {}}>Item #3</MenuItem>
              </Menu>,
              e.currentTarget ?? window
            )
          }
        >
          Server says yolo
        </ButtonItem>
      </PanelSectionRow>

      <PanelSectionRow>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={logo} />
        </div>
      </PanelSectionRow>

      <PanelSectionRow>
        <ButtonItem
          layout="below"
          onClick={() => {
            Router.CloseSideMenus();
            Router.Navigate("/battery-siren");
          }}
        >
          Router
        </ButtonItem>
      </PanelSectionRow>
    </PanelSection>
  );
};

const DeckyPluginRouterTest: VFC = () => {
  return (
    <div style={{ marginTop: "50px", color: "white" }}>
      Hello World!
      <DialogButton onClick={() => Router.NavigateToLibraryTab()}>
        Go to Library
      </DialogButton>
    </div>
  );
};

export default definePlugin((serverApi: ServerAPI) => {
  serverApi.routerHook.addRoute("/battery-siren", DeckyPluginRouterTest, {
    exact: true,
  });

  return {
    title: <div className={staticClasses.Title}>Battery Siren</div>,
    content: <Content serverAPI={serverApi} />,
    icon: <FaCarBattery />,
    onDismount() {
      serverApi.routerHook.removeRoute("/battery-siren");
    },
  };
});
