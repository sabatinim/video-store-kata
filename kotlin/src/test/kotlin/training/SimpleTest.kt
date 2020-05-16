package training

import org.assertj.core.api.Assertions
import org.junit.jupiter.api.Test

class SimpleTest{

    @Test
    internal fun `simple test`() {
        Assertions.assertThat("this").isEqualTo("this")
    }
}