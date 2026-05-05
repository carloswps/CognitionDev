import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { isEphemeralAgent, Panel } from '~/common';
import { AgentPanelProvider, useAgentPanelContext } from '~/Providers/AgentPanelContext';
import store from '~/store';
import ActionsPanel from './ActionsPanel';
import AgentPanel from './AgentPanel';
import VersionPanel from './Version/VersionPanel';

export default function AgentPanelSwitch() {
  return (
    <AgentPanelProvider>
      <AgentPanelSwitchWithContext />
    </AgentPanelProvider>
  );
}

function AgentPanelSwitchWithContext() {
  const { activePanel, setCurrentAgentId } = useAgentPanelContext();
  const agentId = useRecoilValue(store.conversationAgentIdByIndex(0));

  useEffect(() => {
    const agent_id = agentId ?? '';
    if (!isEphemeralAgent(agent_id)) {
      setCurrentAgentId(agent_id);
    }
  }, [setCurrentAgentId, agentId]);

  if (activePanel === Panel.actions) {
    return <ActionsPanel />;
  }
  if (activePanel === Panel.version) {
    return <VersionPanel />;
  }
  return <AgentPanel />;
}
