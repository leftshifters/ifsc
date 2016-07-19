package main

import (
	"bytes"
	"errors"
	"os/exec"
	"strings"
)

// Run : run a command
func Run(params []string, input string) (string, error) {
	var name string
	var out bytes.Buffer
	var args []string

	if len(params) == 0 {
		return out.String(), errors.New("You need to send in something for this to work")
	}

	if len(params) > 0 {
		name = params[0]
	}

	if len(params) > 1 {
		args = params[1:]
	}

	cmd := exec.Command(name, args...)

	// This is to handle stdin
	if input != "" {
		cmd.Stdin = strings.NewReader(input)
	}

	cmd.Stderr = &out
	cmd.Stdout = &out
	err := cmd.Run()
	if err != nil {
		return out.String(), errors.New("We were unable to run this command\n" + err.Error())
	}

	return out.String(), nil

}
