cmake_minimum_required(VERSION 3.10)
project(cpp)

set(CMAKE_CXX_STANDARD 11)

add_executable(cpp src/app.cpp test/acceptance_test.cpp)

add_definitions(-DUNIT_TESTING)