package org.runningdinner.contract;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.runningdinner.core.RunningDinner;
import org.runningdinner.core.RunningDinner.RunningDinnerType;

public class ContractServiceContractChecksTest {

  private final ContractService contractService = new ContractService();

  @Test
  public void demoDinnerDoesNotRequireContractAndReturnsEmptyWhenIncomingIsNull() {

    RunningDinner runningDinner = new RunningDinner();
    runningDinner.setRunningDinnerType(RunningDinnerType.DEMO);

    Optional<Contract> result = contractService.createContractIfNeeded(null, runningDinner);

    assertThat(result).isEmpty();
  }

  @Test
  public void demoDinnerIgnoresIncomingContractAndReturnsEmpty() {

    RunningDinner runningDinner = new RunningDinner();
    runningDinner.setRunningDinnerType(RunningDinnerType.DEMO);

    Contract incomingContract = new Contract();

    Optional<Contract> result = contractService.createContractIfNeeded(incomingContract, runningDinner);

    assertThat(result).isEmpty();
  }

  @Test
  public void standardDinnerRequiresContractAndThrowsOnNullIncoming() {

    RunningDinner runningDinner = new RunningDinner();
    runningDinner.setRunningDinnerType(RunningDinnerType.STANDARD);

    assertThatThrownBy(() -> contractService.createContractIfNeeded(null, runningDinner))
        .isInstanceOf(IllegalArgumentException.class)
        .hasMessageContaining("Expected contract");
  }
}
